import React, { createContext, useContext, useState, forwardRef, useCallback, useRef, useEffect } from 'react';
import type { TabsProps } from '../models';
import { TabsRootStyled, TabsListStyled, TabsScrollButtonStyled } from './styled';

interface TabsContextType {
  value: string | number | undefined;
  onChange: (value: string | number) => void;
  orientation: 'horizontal' | 'vertical';
  variant: 'standard' | 'scrollable' | 'fullWidth';
}

export const TabsContext = createContext<TabsContextType | undefined>(undefined);

export const useTabsContext = () => {
  const context = useContext(TabsContext);
  if (!context) {
    throw new Error('Tab components must be used within a Tabs component');
  }
  return context;
};

const ChevronLeft = () => (
  <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" style={{ width: '1.25rem', height: '1.25rem', fill: 'currentColor' }}><path d="M15.41 16.59L10.83 12l4.58-4.59L14 6l-6 6 6 6 1.41-1.41z"/></svg>
);
const ChevronRight = () => (
  <svg focusable="false" aria-hidden="true" viewBox="0 0 24 24" style={{ width: '1.25rem', height: '1.25rem', fill: 'currentColor' }}><path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z"/></svg>
);

export const Tabs = forwardRef<HTMLDivElement, TabsProps>(
  (
    {
      value: valueProp,
      defaultValue,
      onChange,
      orientation = 'horizontal',
      variant = 'standard',
      children,
      className,
      ...rest
    },
    ref
  ) => {
    const isControlled = valueProp !== undefined;
    const [internalValue, setInternalValue] = useState<string | number | undefined>(defaultValue);

    const currentValue = isControlled ? valueProp : internalValue;

    const listRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateScrollButtons = useCallback(() => {
      if (listRef.current && variant === 'scrollable') {
        const { scrollTop, scrollHeight, clientHeight, scrollLeft, scrollWidth, clientWidth } = listRef.current;
        if (orientation === 'vertical') {
          setCanScrollLeft(scrollTop > 0);
          setCanScrollRight(scrollTop + clientHeight < scrollHeight - 1);
        } else {
          setCanScrollLeft(scrollLeft > 0);
          setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 1);
        }
      } else {
        setCanScrollLeft(false);
        setCanScrollRight(false);
      }
    }, [variant, orientation]);

    useEffect(() => {
      updateScrollButtons();
      const observer = new ResizeObserver(() => updateScrollButtons());
      if (listRef.current) {
        observer.observe(listRef.current);
      }
      return () => observer.disconnect();
    }, [updateScrollButtons]);

    useEffect(() => {
      if (listRef.current && variant === 'scrollable') {
        // Wait for rendering tick to ensure active attribute is flushed to DOM
        const timeoutId = setTimeout(() => {
          if (!listRef.current) return;
          const activeTab = listRef.current.querySelector<HTMLElement>('[aria-selected="true"]');
          if (activeTab) {
            const container = listRef.current;
            if (orientation === 'horizontal') {
              const tabLeft = activeTab.offsetLeft;
              const tabWidth = activeTab.offsetWidth;
              const containerWidth = container.clientWidth;
              const containerScrollLeft = container.scrollLeft;

              if (tabLeft < containerScrollLeft || tabLeft + tabWidth > containerScrollLeft + containerWidth) {
                const targetScrollLeft = tabLeft - containerWidth / 2 + tabWidth / 2;
                container.scrollTo({ left: Math.max(0, targetScrollLeft), behavior: 'smooth' });
              }
            } else {
              const tabTop = activeTab.offsetTop;
              const tabHeight = activeTab.offsetHeight;
              const containerHeight = container.clientHeight;
              const containerScrollTop = container.scrollTop;

              if (tabTop < containerScrollTop || tabTop + tabHeight > containerScrollTop + containerHeight) {
                const targetScrollTop = tabTop - containerHeight / 2 + tabHeight / 2;
                container.scrollTo({ top: Math.max(0, targetScrollTop), behavior: 'smooth' });
              }
            }
          }
        }, 50);
        return () => clearTimeout(timeoutId);
      }
    }, [currentValue, variant, orientation]);

    const handleScroll = () => {
      updateScrollButtons();
    };

    const scroll = (direction: 'left' | 'right') => {
      if (listRef.current) {
        const amount = orientation === 'vertical' ? listRef.current.clientHeight / 2 : listRef.current.clientWidth / 2;
        if (orientation === 'vertical') {
          listRef.current.scrollBy({ top: direction === 'left' ? -amount : amount, behavior: 'smooth' });
        } else {
          listRef.current.scrollBy({ left: direction === 'left' ? -amount : amount, behavior: 'smooth' });
        }
      }
    };

    const handleChange = useCallback(
      (newValue: string | number) => {
        if (!isControlled) {
          setInternalValue(newValue);
        }
        onChange?.(newValue);
      },
      [isControlled, onChange]
    );

    const isScrollable = variant === 'scrollable';

    return (
      <TabsContext.Provider
        value={{
          value: currentValue,
          onChange: handleChange,
          orientation,
          variant,
        }}
      >
        <TabsRootStyled
          ref={ref}
          ownerOrientation={orientation}
          className={className}
          style={{ display: 'flex', flexDirection: orientation === 'vertical' ? 'column' : 'row', alignItems: 'center', width: '100%', position: 'relative' }}
          {...rest}
        >
          {isScrollable && canScrollLeft && (
            <TabsScrollButtonStyled 
              ownerOrientation={orientation}
              onClick={() => scroll('left')}
            >
              <ChevronLeft />
            </TabsScrollButtonStyled>
          )}
          
          <TabsListStyled
            ref={listRef}
            onScroll={handleScroll}
            role="tablist"
            aria-orientation={orientation}
            ownerOrientation={orientation}
            ownerVariant={variant}
            style={{ flexGrow: 1, ...(isScrollable ? { overflow: 'hidden' } : {}) }}
          >
            {children}
          </TabsListStyled>

          {isScrollable && canScrollRight && (
            <TabsScrollButtonStyled 
              ownerOrientation={orientation}
              onClick={() => scroll('right')}
            >
              <ChevronRight />
            </TabsScrollButtonStyled>
          )}
        </TabsRootStyled>
      </TabsContext.Provider>
    );
  }
);

Tabs.displayName = 'Tabs';
