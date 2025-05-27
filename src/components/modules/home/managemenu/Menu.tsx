const Menu = () => {
  return (
    <div>
      <section className="text-center p-8 bg-gray-100 dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-blue-600 dark:text-white">
          Manage Your Menu & Orders
        </h2>
        <p className="mt-4 text-gray-700 dark:text-gray-300 text-lg">
          Easily update your menu, track customer orders, and provide quick
          responses to ensure a seamless meal delivery experience.
        </p>

        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold dark:text-white"> Menu Management</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Add, update, or remove meals from your menu with ease.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold dark:text-white">Order Tracking</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              View incoming orders, track progress, and update order status.
            </p>
          </div>
          <div className="p-6 bg-white dark:bg-gray-800 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold dark:text-white">Quick Responses</h3>
            <p className="mt-2 text-gray-600 dark:text-gray-300">
              Communicate with customers in real-time for order updates and
              special requests.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Menu;
