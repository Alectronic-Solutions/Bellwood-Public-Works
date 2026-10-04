interface EmailTextProps {
  email: string;
}

/**
 * Renders an address with a line break opportunity after the "@", so a long address
 * wraps as "waterservices@ / bellwoodpublicworks.example" in a narrow column instead of
 * breaking mid-word the way `break-all` does.
 */
export function EmailText({ email }: EmailTextProps) {
  const at = email.indexOf("@");
  if (at === -1) return <>{email}</>;
  return (
    <>
      {email.slice(0, at + 1)}
      <wbr />
      {email.slice(at + 1)}
    </>
  );
}
