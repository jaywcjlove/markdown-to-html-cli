export const cssCorners = `
a:hover .octo-arm { animation: octocat-wave 560ms ease-in-out; }
svg { z-index: 99; position: fixed; border: 0px; top: 0px; right: 0; }
@media (max-width:500px) {
  a:hover .octo-arm { animation: none; }
  .octo-arm { animation: octocat-wave 560ms ease-in-out; }
}

@keyframes octocat-wave {
  0%, 100% { transform: rotate(0); }
  20%, 60% { transform: rotate(-25deg); }
  40%, 80% { transform: rotate(10deg); }
}
`;