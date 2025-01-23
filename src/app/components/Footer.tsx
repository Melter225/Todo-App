export default function Footer() {
  return (
    <footer className="bg-gray-300 text-gray-900 py-8 mt-16">
      <div className="container mx-8 text-start">
        <p>
          &copy; {new Date().getFullYear()} The Todo App. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
