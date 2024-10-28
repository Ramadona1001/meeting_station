"use client";

import StoreProvider from "@/redux/store/StoreProvider";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <StoreProvider>
      <div>{children}</div>
    </StoreProvider>
  );
}
