import { ChefHat, Truck, MessageSquare } from "lucide-react";
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
      
          <div className="p-6 bg-blue-50 dark:bg-blue-900 shadow-md rounded-lg transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center gap-3">
              <ChefHat className="w-6 h-6 text-blue-600 dark:text-blue-300" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Menu Management
              </h3>
            </div>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              Add, update, or remove meals from your menu with ease.
            </p>
          </div>

          <div className="p-6 bg-green-50 dark:bg-green-900 shadow-md rounded-lg transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center gap-3">
              <Truck className="w-6 h-6 text-green-600 dark:text-green-300" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Order Tracking
              </h3>
            </div>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
              View incoming orders, track progress, and update order status.
            </p>
          </div>


          <div className="p-6 bg-purple-100 dark:bg-yellow-900 shadow-md rounded-lg transition-all hover:shadow-lg hover:-translate-y-1">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-yellow-600 dark:text-yellow-300" />
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Quick Responses
              </h3>
            </div>
            <p className="mt-2 text-gray-700 dark:text-gray-300">
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
