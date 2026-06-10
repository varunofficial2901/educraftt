"use client";

export default function SloganSection() {
  return (
    <section className="py-24 relative bg-[#F8FAFC]">
      <div className="container mx-auto px-4 md:px-8 max-w-7xl">
        
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif font-bold text-[#0F172A] mb-4">
            Why Parents Trust EduCraft
          </h2>
          <p className="text-[#334155] text-lg font-sans max-w-2xl mx-auto">
            We provide the structured environment your child needs to succeed.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Card 1 */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col items-start text-left">
            <div className="w-full h-48 relative bg-slate-100 shrink-0">
              <img src="/curriculum.jpg" alt="Curriculum Aligned" className="w-full h-full object-cover" />
            </div>
            <div className="p-6 flex-grow flex flex-col items-start">
              <h3 className="text-xl font-serif font-bold text-[#0F172A] mb-2">Curriculum Aligned</h3>
              <p className="text-[#334155] font-sans text-sm leading-relaxed">
                Matches what your child learns at school
              </p>
            </div>
          </div>

          {/* Card 2 */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col items-start text-left">
            <div className="w-full h-48 relative bg-slate-100 shrink-0">
              <img src="/timed.jpg" alt="Timed Practice" className="w-full h-full object-cover" />
            </div>
            <div className="p-6 flex-grow flex flex-col items-start">
              <h3 className="text-xl font-serif font-bold text-[#0F172A] mb-2">Timed Practice</h3>
              <p className="text-[#334155] font-sans text-sm leading-relaxed">
                Helps build confidence for real exam conditions
              </p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col items-start text-left">
            <div className="w-full h-48 relative bg-slate-100 shrink-0">
              <img src="/mock.jpg" alt="Exam-Style Mock Tests" className="w-full h-full object-cover" />
            </div>
            <div className="p-6 flex-grow flex flex-col items-start">
              <h3 className="text-xl font-serif font-bold text-[#0F172A] mb-2">Exam-Style Mock Tests</h3>
              <p className="text-[#334155] font-sans text-sm leading-relaxed">
                Practice with tests designed to feel like real exams
              </p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="bg-white border border-[#E2E8F0] rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-md flex flex-col items-start text-left">
            <div className="w-full h-48 relative bg-slate-100 shrink-0">
              <img src="/detailed.jpg" alt="Detailed Performance Insights" className="w-full h-full object-cover" />
            </div>
            <div className="p-6 flex-grow flex flex-col items-start">
              <h3 className="text-xl font-serif font-bold text-[#0F172A] mb-2">Detailed Performance Insights</h3>
              <p className="text-[#334155] font-sans text-sm leading-relaxed">
                Get clear solutions and understand where your child needs improvement
              </p>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
