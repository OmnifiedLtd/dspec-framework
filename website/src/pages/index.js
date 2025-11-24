import Link from '@docusaurus/Link'
import useBaseUrl from '@docusaurus/useBaseUrl'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Image from '@theme/IdealImage'
import Layout from '@theme/Layout'

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <header className='bg-white dark:bg-gray-950'>
      <div className='mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0'>
        <div className='mr-auto place-self-center lg:col-span-7'>
          <h1 className='mb-4 max-w-2xl text-4xl leading-none font-extrabold tracking-tight md:text-5xl xl:text-6xl dark:text-white'>
            {siteConfig.title}
          </h1>
          <p className='mb-6 max-w-2xl font-light text-gray-500 md:text-lg lg:mb-8 lg:text-xl dark:text-gray-400'>
            {siteConfig.tagline}
          </p>
          <div className='flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4'>
            <Link
              to='/docs/purpose-and-scope'
              className='inline-flex items-center justify-center rounded-lg bg-blue-700 px-5 py-3 text-center text-base font-medium text-white hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 dark:focus:ring-blue-900'
            >
              Get started
              <svg
                className='-mr-1 ml-2 h-5 w-5'
                fill='currentColor'
                viewBox='0 0 20 20'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  d='M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z'
                  clipRule='evenodd'
                ></path>
              </svg>
            </Link>
          </div>
        </div>
        <div className='hidden lg:col-span-5 lg:mt-0 lg:flex'>
          <Image
            img={useBaseUrl('/img/DSpec_Crystalline_Structure_of_Intent.png')}
            alt='The DSpec Framework: Crystalline Structure of Intent'
          />
        </div>
      </div>
    </header>
  )
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext()
  return (
    <Layout
      title={`Hello from ${siteConfig.title}`}
      description='Declarative, Friendly, Formal Specifications for Modern Software'
    >
      <main>
        <HomepageHeader />
        <section className='bg-gray-50 py-16 dark:bg-gray-900'>
          <div className='mx-auto max-w-screen-xl px-4'>
            <h2 className='mb-8 text-center text-3xl font-bold text-gray-900 dark:text-white'>
              Why dspec-framework?
            </h2>
            <div className='grid gap-8 md:grid-cols-3'>
              <div className='rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800'>
                <h3 className='mb-2 text-xl font-bold dark:text-white'>Formal Spec</h3>
                <p className='text-gray-600 dark:text-gray-400'>
                  Define your domain with precision using our tiered specification levels.
                </p>
              </div>
              <div className='rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800'>
                <h3 className='mb-2 text-xl font-bold dark:text-white'>Traceability</h3>
                <p className='text-gray-600 dark:text-gray-400'>
                  Link requirements to implementation with built-in governance tools.
                </p>
              </div>
              <div className='rounded-lg border border-gray-200 bg-white p-6 shadow dark:border-gray-700 dark:bg-gray-800'>
                <h3 className='mb-2 text-xl font-bold dark:text-white'>Clean Design</h3>
                <p className='text-gray-600 dark:text-gray-400'>
                  Documentation that looks as good as it works.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  )
}
