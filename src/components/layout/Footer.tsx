
import { Link } from "react-router-dom";
import { Recycle, Instagram, Twitter, Facebook } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner dark:bg-gray-950 pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap">
          <div className="w-full md:w-4/12 mb-8 md:mb-0">
            <div className="flex items-center mb-3">
              <div className="bg-eco-primary rounded-full p-2 mr-2">
                <Recycle className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-eco-dark dark:text-white">DeepWaste</span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Promoting sustainable waste management with rewards for our planet's future.
            </p>
            <div className="flex space-x-3">
              <a href="#" className="text-gray-500 hover:text-eco-primary">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-eco-primary">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-500 hover:text-eco-primary">
                <Facebook size={20} />
              </a>
            </div>
          </div>
          
          <div className="w-full md:w-8/12">
            <div className="flex flex-wrap">
              <div className="w-full sm:w-4/12 mb-6">
                <h4 className="text-md font-medium text-eco-dark dark:text-white mb-3">Navigation</h4>
                <ul className="space-y-2">
                  <li><Link to="/" className="text-gray-600 dark:text-gray-400 hover:text-eco-primary">Scan Waste</Link></li>
                  <li><Link to="/rewards" className="text-gray-600 dark:text-gray-400 hover:text-eco-primary">My Rewards</Link></li>
                  <li><Link to="/partners" className="text-gray-600 dark:text-gray-400 hover:text-eco-primary">Partner Shops</Link></li>
                  <li><Link to="/collection" className="text-gray-600 dark:text-gray-400 hover:text-eco-primary">Waste Collection</Link></li>
                </ul>
              </div>
              
              <div className="w-full sm:w-4/12 mb-6">
                <h4 className="text-md font-medium text-eco-dark dark:text-white mb-3">Resources</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-eco-primary">Blog</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-eco-primary">Eco Tips</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-eco-primary">FAQ</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-eco-primary">Support</a></li>
                </ul>
              </div>
              
              <div className="w-full sm:w-4/12 mb-6">
                <h4 className="text-md font-medium text-eco-dark dark:text-white mb-3">Legal</h4>
                <ul className="space-y-2">
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-eco-primary">Privacy Policy</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-eco-primary">Terms of Service</a></li>
                  <li><a href="#" className="text-gray-600 dark:text-gray-400 hover:text-eco-primary">Cookie Policy</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 dark:border-gray-800 mt-6 pt-6 text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            &copy; {new Date().getFullYear()} DeepWaste. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
