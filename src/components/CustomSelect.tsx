"use client";
import { useState, useRef, useEffect } from "react";

interface CustomSelectProps {
  options: { label: string; value: string }[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  icon?: string;
}

export default function CustomSelect({ options, value, onChange, placeholder, className, icon }: CustomSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(o => o.value === value);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className={`relative ${className || ""}`} ref={dropdownRef}>
      {icon && (
        <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-primary z-10 pointer-events-none">
          {icon}
        </span>
      )}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full bg-surface border border-outline-variant rounded-xl ${icon ? 'pl-12' : 'pl-4'} pr-10 py-4 font-body-md text-left text-on-surface focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all shadow-sm cursor-pointer`}
      >
        <span className={selectedOption ? "text-on-surface" : "text-on-surface-variant"}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <span className={`material-symbols-outlined absolute right-4 top-1/2 -translate-y-1/2 text-secondary pointer-events-none transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
          expand_more
        </span>
      </button>

      {isOpen && (
        <ul className="absolute z-50 w-full mt-2 bg-surface border border-outline-variant rounded-xl shadow-lg max-h-60 overflow-auto py-1">
          {options.map((option) => (
            <li
              key={option.value}
              onClick={() => {
                onChange(option.value);
                setIsOpen(false);
              }}
              className={`px-4 py-3 cursor-pointer hover:bg-surface-variant transition-colors font-body-md ${value === option.value ? 'bg-primary-container text-on-primary-container font-semibold' : 'text-on-surface'}`}
            >
              {option.label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
