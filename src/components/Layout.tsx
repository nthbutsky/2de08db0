type TProps = {
  children: React.ReactNode;
  title: string;
};

export default function Layout({ children, title }: TProps) {
  return (
    <div className="min-h-full">
      <div className="py-10">
        <header>
          <div className="mx-auto max-w-md px-4 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold leading-tight tracking-tight text-gray-900">
              {title}
            </h1>
          </div>
        </header>
        <main>
          <div className="mx-auto max-w-md px-4 py-8 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
