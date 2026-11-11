export default function Providers({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // No provider is needed: components are styled directly against the design
  // tokens. Add context providers here if you need them.
  return <>{children}</>;
}
