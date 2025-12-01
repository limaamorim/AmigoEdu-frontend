export default function MetaCardAdmin({ children, className, ...rest }) {
  return (
    <div
      className={`
        flex flex-col bg-white rounded-3xl shadow p-7
        ${className}
      `}
      {...rest}
    >
      {children}
    </div>
  );
}
