import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Philbert Muhire</h3>
            <p className="text-slate-300 mb-6 max-w-md">
              A Data Analyst and Software Developer who loves working with data and building softwares. I turn raw information into useful insights and create tools that help solve real-world problems. My work combines analytical thinking with technical skills to make a real impact.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">
                <i className="fab fa-github text-xl"></i>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-slate-400 hover:text-white transition-colors duration-300">
                <i className="fas fa-envelope text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/"><span className="text-slate-300 hover:text-white transition-colors duration-300 cursor-pointer">Home</span></Link></li>
              <li><Link href="/about"><span className="text-slate-300 hover:text-white transition-colors duration-300 cursor-pointer">About</span></Link></li>
              <li><Link href="/services"><span className="text-slate-300 hover:text-white transition-colors duration-300 cursor-pointer">Services</span></Link></li>
              <li><Link href="/projects"><span className="text-slate-300 hover:text-white transition-colors duration-300 cursor-pointer">Projects</span></Link></li>
              <li><Link href="/blogs"><span className="text-slate-300 hover:text-white transition-colors duration-300 cursor-pointer">Blog</span></Link></li>
              <li><Link href="/contact"><span className="text-slate-300 hover:text-white transition-colors duration-300 cursor-pointer">Contact</span></Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li className="text-slate-300">Web Development</li>
              <li className="text-slate-300">Mobile Development</li>
              <li className="text-slate-300">Data Analysis</li>
              <li className="text-slate-300">UI Design</li>
              <li className="text-slate-300">Graphic Design</li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <p className="text-slate-400">
            © 2025 Philbert Muhire. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
