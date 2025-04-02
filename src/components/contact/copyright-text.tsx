export function CopyrightText() {
  const year = new Date().getFullYear();
  return (
    <p className="font-firaCode text-sm text-roughAsphalt/60 md:text-base">
      © {year}_all_rights_reserved
    </p>
  );
}
