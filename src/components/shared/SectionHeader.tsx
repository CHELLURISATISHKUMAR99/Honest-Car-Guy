import { cn } from '@/lib/utils/cn';

interface Props {
  eyebrow?: string;
  title: string;
  description?: React.ReactNode;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: Props) {
  return (
    <div
      className={cn(
        'mb-12 max-w-3xl',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow && (
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-red">
          {eyebrow}
        </p>
      )}
      <h2 className="headline text-4xl text-black sm:text-5xl">{title}</h2>
      {description && (
        <p className="mt-4 text-base text-gray sm:text-lg">{description}</p>
      )}
    </div>
  );
}
