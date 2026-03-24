export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // The [lang] layout handles <html> and <body>.
  // This root layout must exist but should not render its own shell.
  return <>{children}</>
}
