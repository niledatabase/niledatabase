type ConfigOptions = 'white' | 'default';
export type OverrideClasses = {
  titleClasses?: string;
  subtitleClasses?: string;
};
export type ColorConfig = Record<ConfigOptions, OverrideClasses>;

const base = {
  titleClasses:
    'leading-[40px] text-[32px] lg:leading-[72px] lg:text-[64px] text-center px-2',
  subtitleClasses:
    'text-xl font-inter mt-2 text-center opacity-80 text-[18px] leading-[28px] lg:font-normal lg:leading-10 tracking-[0.4px] px-2',
};

const colorClasses: ColorConfig = {
  white: {
    titleClasses: base.titleClasses,
    subtitleClasses: base.subtitleClasses,
  },
  default: {
    titleClasses: `bg-gradient-text bg-clip-text text-transparent ${base.titleClasses}`,
    subtitleClasses: base.subtitleClasses,
  },
};

export default function PageHeader({
  title,
  subtitle,
  color = 'default',
  titleClasses: titleOverrides = '',
  subtitleClasses: subOverrides = '',
}: {
  title: JSX.Element | string;
  subtitle?: JSX.Element | string;
  color?: ConfigOptions;
  subtitleClasses?: string;
  titleClasses?: string;
}) {
  const { titleClasses, subtitleClasses } = colorClasses[color];
  return (
    <div>
      <h1 className={`${titleClasses} ${titleOverrides}`}>{title}</h1>
      {subtitle && (
        <div className={`${subtitleClasses} ${subOverrides}`}>{subtitle}</div>
      )}
    </div>
  );
}
