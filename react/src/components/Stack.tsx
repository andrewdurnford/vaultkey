import styled from "styled-components";

type Size = "none" | "xs" | "s" | "m" | "l" | "xl";

function transformSize(size: Size) {
  switch (size) {
    case "xs":
      return "0.25rem";
    case "s":
      return "0.5rem";
    case "m":
      return "1rem";
    case "l":
      return "1.5rem";
    case "xl":
      return "2rem";
    default:
      return undefined;
  }
}

const Container = styled.div<{ $direction: "column" | "row"; $gap: Size }>`
  display: flex;
  flex-direction: ${(props) => props.$direction};
  gap: ${(props) => transformSize(props.$gap)};
`;

type StackProps<T = keyof JSX.IntrinsicElements | React.ComponentType<any>> =
  React.HTMLAttributes<T> & {
    as?: T;
    children?: React.ReactNode;
    direction?: "column" | "row";
    gap?: Size;
  };

export function Stack({
  direction = "column",
  gap = "none",
  children,
}: StackProps) {
  return (
    <Container $direction={direction} $gap={gap}>
      {children}
    </Container>
  );
}
