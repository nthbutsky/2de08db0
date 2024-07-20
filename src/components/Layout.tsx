type TProps = {
  children: React.ReactNode;
  title: string;
};

export const Layout = ({ children, title }: TProps) => {
  return (
    <div className="min-h-full">
      <div className="py-10">
        <header>
          <div className="mx-auto max-w-md p-4 sm:p-6">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              {title}
            </h1>
          </div>
        </header>
        <main>
          <div className="relative mx-auto max-w-md rounded-md border border-gray-100 px-4 py-4 sm:px-6 sm:py-4">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};
