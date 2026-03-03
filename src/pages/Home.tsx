import { Link } from "react-router";
import { FileText, Smartphone } from "lucide-react";
import { Button } from "../components/ui/button";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f8f9fa] to-[#e9ecef] flex items-center justify-center p-6">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-semibold text-[#252a31] mb-3">
            Zuper Demo Hub
          </h1>
          <p className="text-[#4f5e71] text-lg">
            Select a demo to explore
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Proposal Flow Card */}
          <Link to="/proposal" className="group">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-[#e8edf1] hover:shadow-md hover:border-[#0172cb] transition-all h-full flex flex-col">
              <div className="w-14 h-14 rounded-lg bg-[#e8f4fd] flex items-center justify-center mb-6 group-hover:bg-[#0172cb] transition-colors">
                <FileText className="w-7 h-7 text-[#0172cb] group-hover:text-white transition-colors" />
              </div>
              
              <h2 className="text-2xl font-semibold text-[#252a31] mb-3">
                Proposal Signing Flow
              </h2>
              
              <p className="text-[#4f5e71] mb-6 flex-1">
                DocuSign-style proposal signing experience with guided acknowledgement, 
                custom signature form, and multi-signer support for roofing proposals.
              </p>

              <div className="flex items-center text-[#0172cb] font-medium group-hover:gap-2 transition-all">
                <span>Launch Demo</span>
                <svg className="w-5 h-5 ml-1 group-hover:ml-0 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>

          {/* Mobile Design Card */}
          <Link to="/mobile" className="group">
            <div className="bg-white rounded-xl p-8 shadow-sm border border-[#e8edf1] hover:shadow-md hover:border-[#e44a19] transition-all h-full flex flex-col">
              <div className="w-14 h-14 rounded-lg bg-[#fbe9e7] flex items-center justify-center mb-6 group-hover:bg-[#e44a19] transition-colors">
                <Smartphone className="w-7 h-7 text-[#e44a19] group-hover:text-white transition-colors" />
              </div>
              
              <h2 className="text-2xl font-semibold text-[#252a31] mb-3">
                Mobile: Add Products
              </h2>
              
              <p className="text-[#4f5e71] mb-6 flex-1">
                Mobile-optimized interface for adding products and services with 
                search, filtering, and product selection capabilities.
              </p>

              <div className="flex items-center text-[#e44a19] font-medium group-hover:gap-2 transition-all">
                <span>Launch Demo</span>
                <svg className="w-5 h-5 ml-1 group-hover:ml-0 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </Link>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[#6b7280] text-sm">
            Built with React, TypeScript, and Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
}
