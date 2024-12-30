import styled, { keyframes } from "styled-components";

const rotate = keyframes`
    to {
        transform: rotate(1turn);
    }
`;

const Spinner = styled.div`
  margin: 4.8rem auto;

  width: 6.4rem;
  aspect-ratio: 1;
  border-radius: 50%;

  /* Background with radial and conic gradients */
  background:
    radial-gradient(farthest-side, var(--color-brand-600) 94%, transparent) top /
      10px 10px no-repeat,
    conic-gradient(transparent 30%, var(--color-brand-600));

  /* Webkit mask for circular masking */
  -webkit-mask: radial-gradient(
    farthest-side,
    transparent calc(100% - 10px),
    black 0
  );

  mask: radial-gradient(farthest-side, transparent calc(100% - 10px), black 0);

  animation: ${rotate} 1.5s infinite linear;
`;

export default Spinner;
