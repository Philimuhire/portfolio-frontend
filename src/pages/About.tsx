export default function About() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl font-bold text-slate-800 mb-4">About Me</h1>
          <p className="text-xl text-slate-600">Bringing ideas to life through code and data.</p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd2?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600" 
              alt="Bringing ideas to life through code and data." 
              className="rounded-xl shadow-lg w-full" 
            />
          </div>
          <div className="space-y-6">
            <p className="text-lg text-slate-600 leading-relaxed">
              I'm a results-driven full stack developer and data analyst with over 2 years of experience delivering reliable, user-focused digital solutions. My journey began with a curiosity about how technology works, which has grown into a passion for solving problems with code and data.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              I specialize in modern JavaScript frameworks, backend development, and cloud technologies. I also enjoy working with data transforming complex information into clear, actionable insights.
            </p>
            <p className="text-lg text-slate-600 leading-relaxed">
              Whether you're looking to build a scalable web app, automate processes, or analyze data to guide decision-making, I’m ready to help. I'm currently open to job opportunities, freelance projects, or collaborations where I can add value and grow alongside ambitious teams.
            </p>
            <div className="grid grid-cols-2 gap-4 pt-4">
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-slate-600 font-medium">Projects Completed</div>
              </div>
              <div className="text-center p-4 bg-slate-50 rounded-lg">
                <div className="text-2xl font-bold text-primary">5+</div>
                <div className="text-slate-600 font-medium">Years Experience</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">My Journey</h2>
          <div className="space-y-8 max-w-4xl mx-auto">
            <div className="flex items-start">
              <div className="flex-shrink-0 w-4 h-4 bg-primary rounded-full mt-2"></div>
              <div className="ml-6">
                <div className="text-sm text-slate-500 mb-1">2021 - Present</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Full Stack Developer</h3>
                <p className="text-slate-600">Building scalable web applications using React, Node.js, and modern development practices. Led multiple projects from conception to deployment.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-4 h-4 bg-primary rounded-full mt-2"></div>
              <div className="ml-6">
                <div className="text-sm text-slate-500 mb-1">2020 - 2021</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Frontend Developer</h3>
                <p className="text-slate-600">Specialized in creating responsive user interfaces and improving user experience. Worked with React, Vue.js, and modern CSS frameworks.</p>
              </div>
            </div>
            <div className="flex items-start">
              <div className="flex-shrink-0 w-4 h-4 bg-primary rounded-full mt-2"></div>
              <div className="ml-6">
                <div className="text-sm text-slate-500 mb-1">2019 - 2020</div>
                <h3 className="text-xl font-semibold text-slate-800 mb-2">Junior Developer</h3>
                <p className="text-slate-600">Started my development journey, learning fundamentals of web development, JavaScript, and working on small to medium-sized projects.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20">
          <h2 className="text-3xl font-bold text-slate-800 text-center mb-12">Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-check-circle text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Quality First</h3>
              <p className="text-slate-600">Committed to writing clean, maintainable code and delivering high-quality solutions.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-bolt text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Innovation</h3>
              <p className="text-slate-600">Always exploring new technologies and approaches to solve problems more effectively.</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                <i className="fas fa-users text-2xl text-primary"></i>
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-3">Collaboration</h3>
              <p className="text-slate-600">Believe in the power of teamwork and enjoy mentoring others in their development journey.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
