import tailwind from "tailwind-rn";
import { useMediaQuery } from "react-responsive";

export default function useTailwind() {
  function useIsAtLeastSm() {
    return useMediaQuery({ minWidth: 640 });
  }

  function useIsAtLeastMd() {
    return useMediaQuery({ minWidth: 768 });
  }

  function useIsAtLeastLg() {
    return useMediaQuery({ minWidth: 1024 });
  }

  function useIsAtLeastXl() {
    return useMediaQuery({ minWidth: 1280 });
  }

  const sm = useIsAtLeastSm();
  const md = useIsAtLeastMd();
  const lg = useIsAtLeastLg();
  const xl = useIsAtLeastXl();
console.log({
  sm,
  md,
  lg,
  xl,
});
  function tailwindResponsive(
    always: string,
    { sm, md, lg, xl }: { sm?: string; md?: string; lg?: string; xl?: string },
    {
      sm: applySm,
      md: applyMd,
      lg: applyLg,
      xl: applyXl,
    }: {
      sm?: boolean;
      md?: boolean;
      lg?: boolean;
      xl?: boolean;
    }
  ) {
    return tailwind(
      [always, applySm && sm, applyMd && md, applyLg && lg, applyXl && xl]
        .filter(Boolean)
        .join(" ")
    );
  }

  return { tailwindResponsive, sm, md, lg, xl };
}
