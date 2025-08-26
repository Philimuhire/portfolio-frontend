import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4">Philbert Muhire</h3>
            <p className="text-slate-300 mb-6 max-w-md">
             I am an IT Professional passionate about data, software development, and technology systems. 
             I turn raw information into valuable insights, build tools that solve real-world problems, and 
             ensure smooth IT operations. My work blends analytical thinking with technical expertise to deliver 
             impactful solutions.
            </p>
            <div className="flex space-x-4">
              <a href="https://github.com/Philimuhire" target="_blank" className="text-slate-400 hover:text-white transition-colors duration-300">
                <i className="fab fa-github text-xl"></i>
              </a>
              <a href="https://www.linkedin.com/in/philbert-muhire-182b96195/" target="_blank" className="text-slate-400 hover:text-white transition-colors duration-300">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
              <a href="https://x.com/PhilbertMuhire2" target="_blank" className="text-slate-400 hover:text-white transition-colors duration-300">
                <i className="fa-brands fa-x-twitter text-xl"></i>
              </a>
              <a href="mailto:philimuhire@gmail.com" target="_blank" className="text-slate-400 hover:text-white transition-colors duration-300">
                <i className="fas fa-envelope text-xl"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/"><span className="text-slate-300 hover:text-white transition-colors duration-300 cursor-pointer">Home</span></Link></li>
              <li><Link to="/about"><span className="text-slate-300 hover:text-white transition-colors duration-300 cursor-pointer">About</span></Link></li>
              <li><Link to="/skills"><span className="text-slate-300 hover:text-white transition-colors duration-300 cursor-pointer">Skills</span></Link></li>
              <li><Link to="/services"><span className="text-slate-300 hover:text-white transition-colors duration-300 cursor-pointer">Services</span></Link></li>
              <li><Link to="/projects"><span className="text-slate-300 hover:text-white transition-colors duration-300 cursor-pointer">Projects</span></Link></li>
              <li><Link to="/blogs"><span className="text-slate-300 hover:text-white transition-colors duration-300 cursor-pointer">Blog</span></Link></li>
              <li><Link to="/contact"><span className="text-slate-300 hover:text-white transition-colors duration-300 cursor-pointer">Contact</span></Link></li>
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
