import React from 'react';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Image from '@theme/IdealImage';
import useBaseUrl from '@docusaurus/useBaseUrl';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className="bg-white dark:bg-gray-950">
      <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
        <div className="mr-auto place-self-center lg:col-span-7">
          <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
            {siteConfig.title}
          </h1>
          <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
            {siteConfig.tagline}
          </p>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <Link
              to="/docs/purpose-and-scope"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-center text-white rounded-lg bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900">
              Get started
              <svg className="w-5 h-5 ml-2 -mr-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            </Link>
          </div>
        </div>
        <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
          <Image img={useBaseUrl('/img/DSpec_Crystalline_Structure_of_Intent.png')} alt="The DSpec Framework: Crystalline Structure of Intent" />
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description="Formal Specifications for Modern Software">
      <main>
        <HomepageHeader />
        <section className="bg-gray-50 dark:bg-gray-900 py-16">
           <div className="max-w-screen-xl px-4 mx-auto">
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-8 text-center">Why dspec-framework?</h2>
              <div className="grid md:grid-cols-3 gap-8">
                 <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold mb-2 dark:text-white">Formal Spec</h3>
                    <p className="text-gray-600 dark:text-gray-400">Define your domain with precision using our tiered specification levels.</p>
                 </div>
                 <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold mb-2 dark:text-white">Traceability</h3>
                    <p className="text-gray-600 dark:text-gray-400">Link requirements to implementation with built-in governance tools.</p>
                 </div>
                 <div className="p-6 bg-white rounded-lg shadow dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
                    <h3 className="text-xl font-bold mb-2 dark:text-white">Clean Design</h3>
                    <p className="text-gray-600 dark:text-gray-400">Documentation that looks as good as it works.</p>
                 </div>
              </div>
           </div>
        </section>
      </main>
    </Layout>
  );
}
