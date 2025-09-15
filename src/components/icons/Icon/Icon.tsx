import * as React from 'react';

export type IconProps = React.SVGAttributes<SVGElement> & {
  className?: string;
  color?: 'primary' | 'secondary' | 'accent';
  width?: number;
  height?: number;
};

const colorValues: Record<NonNullable<IconProps['color']>, string> = {
  primary: 'var(--color-text-primary)',
  secondary: 'var(--color-text-secondary)',
  accent: 'var(--color-brand)',
};

const Icon: React.FC<React.PropsWithChildren<IconProps>> = ({
  children,
  className,
  color,
  width = 24,
  height = 24,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      className={className}
      color={color ? colorValues[color] : 'currentColor'}
      {...props}
    >
      {children}
    </svg>
  );
};

export default Icon;
