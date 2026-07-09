export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // NextUIProvider removed in the Manuscript migration; no provider is needed
  // now that components are styled directly against the design tokens.
  return <>{children}</>;
}
