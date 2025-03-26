import React from "react";

const Testimonials = ({ testimonials, currentIndex, setCurrentIndex }) => {
  const nextTestimonial = () => {
    const nextIndex = (currentIndex + 1) % testimonials.length;
    setCurrentIndex(nextIndex);
  };

  const prevTestimonial = () => {
    const prevIndex =
      (currentIndex - 1 + testimonials.length) % testimonials.length;
    setCurrentIndex(prevIndex);
  };

  const goToTestimonial = (index) => {
    setCurrentIndex(index);
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50 border-b border-gray-100 hover:border-gray-200 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in p-6 rounded-2xl hover:bg-gray-50/50 transition-all duration-300 border border-transparent hover:border-gray-100">
          <h2 className="text-3xl font-bold text-gray-900 mb-4 hover:text-primary transition-colors duration-300">
            What Our Users Say
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto hover:text-gray-800 transition-colors duration-300">
            Join thousands of professionals who trust Laboral History to manage
            their work documentation securely.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative overflow-hidden rounded-2xl shadow-medium bg-white border border-gray-100 hover:border-primary/20 transition-all duration-300 hover:-translate-y-1 hover:shadow-strong group">
            {/* Testimonial Card */}
            <div className="p-8 md:p-10 animate-fade-in relative z-10">
              <div className="absolute -right-16 -top-16 w-32 h-32 bg-primary/5 rounded-full group-hover:bg-primary/10 transition-all duration-300"></div>
              <div className="flex flex-col md:flex-row items-start md:items-center mb-6 relative">
                <div className="flex-shrink-0 mb-4 md:mb-0">
                  <div className="w-16 h-16 bg-gradient-to-r from-primary to-primary-dark rounded-full flex items-center justify-center text-white font-bold text-xl shadow-soft hover:shadow-medium transition-all duration-300 transform hover:scale-105 border border-transparent hover:border-white/20">
                    {testimonials[currentIndex].initials}
                  </div>
                </div>
                <div className="md:ml-6">
                  <div className="flex items-center mb-1">
                    <h4 className="text-xl font-bold text-gray-900 group-hover:text-primary transition-colors duration-300">
                      {testimonials[currentIndex].name}
                    </h4>
                    <div className="ml-2 flex">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5 text-warning group-hover:scale-110 transition-transform duration-300"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-gray-600 group-hover:text-gray-700 transition-colors duration-300">
                    {testimonials[currentIndex].role}
                  </p>
                </div>
              </div>

              <blockquote className="relative pt-10 pl-12 hover:bg-gray-50/30 rounded-xl p-4 transition-all duration-300 border border-transparent hover:border-gray-100">
                <svg
                  className="absolute top-0 left-0 h-14 w-14 text-primary opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                  fill="currentColor"
                  viewBox="0 0 32 32"
                  aria-hidden="true"
                >
                  <path d="M9.352 4C4.456 7.456 1 13.12 1 19.36c0 5.088 3.072 8.064 6.624 8.064 3.36 0 5.856-2.688 5.856-5.856 0-3.168-2.208-5.472-5.088-5.472-.576 0-1.344.096-1.536.192.48-3.264 3.552-7.104 6.624-9.024L9.352 4zm16.512 0c-4.8 3.456-8.256 9.12-8.256 15.36 0 5.088 3.072 8.064 6.624 8.064 3.264 0 5.856-2.688 5.856-5.856 0-3.168-2.304-5.472-5.184-5.472-.576 0-1.248.096-1.44.192.48-3.264 3.456-7.104 6.528-9.024L25.864 4z" />
                </svg>
                <p className="relative text-xl text-gray-800 italic leading-relaxed group-hover:text-gray-900 transition-colors duration-300">
                  {testimonials[currentIndex].text}
                </p>
              </blockquote>
            </div>

            {/* Navigation Controls */}
            <div className="absolute bottom-4 right-4 flex space-x-2">
              <button
                onClick={prevTestimonial}
                className="p-2 rounded-full bg-white shadow-soft hover:shadow-medium transition-all duration-200 text-gray-600 hover:text-primary hover:bg-primary/5 focus:outline-none transform hover:scale-110 border border-transparent hover:border-primary/10"
                aria-label="Previous testimonial"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              <button
                onClick={nextTestimonial}
                className="p-2 rounded-full bg-white shadow-soft hover:shadow-medium transition-all duration-200 text-gray-600 hover:text-primary hover:bg-primary/5 focus:outline-none transform hover:scale-110 border border-transparent hover:border-primary/10"
                aria-label="Next testimonial"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
          </div>

          {/* Testimonial Indicators */}
          <div className="flex justify-center mt-6 space-x-2 p-2 rounded-full hover:bg-white/50 transition-all duration-300 inline-block mx-auto border border-transparent hover:border-gray-200">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => goToTestimonial(index)}
                className={`w-3 h-3 rounded-full transition-all duration-200 transform ${
                  index === currentIndex
                    ? "bg-primary scale-125 shadow-soft"
                    : "bg-gray-300 hover:bg-gray-400 hover:scale-110"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
