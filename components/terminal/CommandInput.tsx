'use client';

import { type FormEvent, type KeyboardEvent, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { AUTOCOMPLETE_COMMANDS } from '@/lib/terminal';

interface CommandInputProps {
  onSubmit: (command: string) => void;
  disabled?: boolean;
}

export function CommandInput({ onSubmit, disabled = false }: CommandInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [inputValue, setInputValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const normalizedInput = useMemo(() => inputValue.toLowerCase().trim(), [inputValue]);

  const showAutocomplete =
    isOpen && isFocused && normalizedInput.startsWith('/') && inputValue.length > 0;

  const suggestions = useMemo(() => {
    if (!normalizedInput.startsWith('/')) {
      return [];
    }

    const matches = AUTOCOMPLETE_COMMANDS.filter((cmd) =>
      cmd.command.startsWith(normalizedInput)
    );

    return matches;
  }, [normalizedInput]);

  const hasSuggestions = showAutocomplete && suggestions.length > 0;
  const showNoMatch = showAutocomplete && suggestions.length === 0;

  const executeCommand = useCallback(
    (command = inputValue) => {
      const trimmed = command.trim();
      if (!trimmed || disabled) {
        return;
      }

      onSubmit(trimmed);
      setInputValue('');
      setSelectedIndex(0);
      setIsOpen(false);
    },
    [disabled, onSubmit, inputValue]
  );

  const applySuggestion = useCallback(
    (command: string) => {
      setInputValue(command);
      setSelectedIndex(0);

      requestAnimationFrame(() => {
        inputRef.current?.focus();
        inputRef.current?.setSelectionRange(command.length, command.length);
      });
    },
    []
  );

  const handleChange = (value: string) => {
    setInputValue(value);
    setSelectedIndex(0);

    if (value.toLowerCase().trim().startsWith('/')) {
      setIsOpen(true);
    } else {
      setIsOpen(false);
      setSelectedIndex(0);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const exactMatch = suggestions.some((entry) => entry.command === normalizedInput);

    if (showAutocomplete && hasSuggestions) {
      const highlighted = suggestions[selectedIndex];
      if (highlighted && normalizedInput !== highlighted.command) {
        applySuggestion(highlighted.command);
        return;
      }

      if (exactMatch) {
        executeCommand();
        return;
      }
    }

    executeCommand();
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!showAutocomplete || (suggestions.length === 0 && !showNoMatch)) {
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
      return;
    }

    if (e.key === 'ArrowDown' && suggestions.length > 0) {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % suggestions.length);
      return;
    }

    if (e.key === 'ArrowUp' && suggestions.length > 0) {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + suggestions.length) % suggestions.length);
      return;
    }

    if (e.key === 'Tab' && suggestions.length > 0) {
      e.preventDefault();
      applySuggestion(suggestions[selectedIndex]?.command ?? '');
      return;
    }

    if (e.key === 'Escape') {
      e.preventDefault();
      setIsOpen(false);
      return;
    }

    if (e.key === 'Enter' && isFocused) {
      const highlighted = suggestions[selectedIndex];
      if (highlighted && normalizedInput !== highlighted.command) {
        e.preventDefault();
        applySuggestion(highlighted.command);
      }
    }
  };

  const renderCommand = (command: string) => {
    if (!normalizedInput.startsWith('/') || normalizedInput === '/') {
      return <span>{command}</span>;
    }

    const prefix = normalizedInput;
    if (!command.startsWith(prefix)) {
      return <span>{command}</span>;
    }

    return (
      <>
        <span className="terminal-glow-success">{command.slice(0, normalizedInput.length)}</span>
        <span>{command.slice(normalizedInput.length)}</span>
      </>
    );
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="space-y-2 px-2 sm:px-4 py-2 sm:py-3 border-t border-primary"
    >
      <div className="relative">
        <div className="flex items-center gap-2 min-w-0">
          <span className="terminal-glow-info flex-shrink-0">▶</span>
          <input
            ref={inputRef}
            type="text"
            placeholder="Enter command"
            disabled={disabled}
            value={inputValue}
            onChange={(e) => handleChange(e.target.value)}
            onFocus={() => {
              setIsFocused(true);
              if (inputValue.toLowerCase().trim().startsWith('/')) {
                setIsOpen(true);
              }
            }}
            onBlur={() => {
              setIsFocused(false);
              setIsOpen(false);
            }}
            onKeyDown={handleKeyDown}
            className="flex-1 bg-transparent outline-none text-foreground placeholder-muted-foreground font-mono text-xs sm:text-sm min-w-0"
          />
        </div>

        <div
          className="absolute left-0 right-0 z-20 mt-1 border border-primary bg-primary/90 backdrop-blur-sm font-mono text-xs"
          style={{ display: isOpen ? 'block' : 'none' }}
        >
          {showAutocomplete ? (
            <>
              {showNoMatch ? (
                <div className="border-b border-primary px-3 py-2 text-muted-foreground">[NO_MATCH] unknown command</div>
              ) : (
                <div className="max-h-56 overflow-y-auto">
                  {suggestions.map((cmd, idx) => {
                    const isActive = idx === selectedIndex;
                    return (
                      <button
                        type="button"
                        key={cmd.command}
                        onMouseDown={(event) => {
                          event.preventDefault();
                          applySuggestion(cmd.command);
                        }}
                        onMouseEnter={() => setSelectedIndex(idx)}
                        onFocus={(event) => {
                          event.preventDefault();
                        }}
                        className={`w-full text-left px-3 py-2 border-b border-primary last:border-b-0 flex items-start gap-2 transition-colors ${
                          isActive
                            ? 'bg-secondary border-l-2 border-l-green-400 terminal-glow-success'
                            : 'hover:bg-background/80'
                        }`}
                      >
                        <div className={`flex-1 min-w-0 ${isActive ? 'terminal-glow-success' : ''}`}>
                          <div className="text-xs flex items-center gap-2">
                            <span>{renderCommand(cmd.command)}</span>
                            {isActive ? (
                              <motion.span
                                animate={{ opacity: [0.4, 1, 0.4] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                                className="text-cyan-300"
                              >
                                _
                              </motion.span>
                            ) : null}
                          </div>
                          <div className="text-xs text-muted-foreground truncate">{cmd.description}</div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}
            </>
          ) : null}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="text-xs text-muted-foreground font-mono pl-6"
      >
        Tab to autocomplete · ↑↓ to navigate · Enter to run
      </motion.div>
    </motion.form>
  );
}
