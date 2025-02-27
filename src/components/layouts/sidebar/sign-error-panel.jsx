export default function SignErrorPanel({ errorMessages }) {
  return (
    <>
      {Object.values(errorMessages).map((field) => {
        if (!field.message) return null;
        return (
          <p key={field.name} className="text-sm text-left text-error">
            {field.name} : {field.message}
          </p>
        );
      })}
    </>
  );
}
