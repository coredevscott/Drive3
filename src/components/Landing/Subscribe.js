import { CalendarDaysIcon, HandRaisedIcon } from '@heroicons/react/24/outline'

export default function Subscribe() {
  return (
    <div className="relative py-16 overflow-hidden bg-transparent isolate sm:py-24 lg:py-32">
      <div className="px-6 mx-auto max-w-7xl lg:px-8">
        <div className="grid max-w-2xl grid-cols-1 mx-auto gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-2">
          <div className="max-w-xl text-left lg:max-w-lg">
            <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">Subscribe to get latest update</h2>
            <p className="mt-4 text-lg leading-8 text-gray-300">
              Stay informed with our weekly articles, delivering valuable content directly to your inbox.
            </p>
            <div className="flex items-center justify-center max-w-md mt-6 gap-x-4">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-3 text-white shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                placeholder="Enter your email"
              />
              <a href="https://t.me/ethdriveglobal" target="_blank"><button className='px-5 py-3 font-medium text-white rounded-md bg-gradient-to-r from-[#933FFE] to-[#18C8FF]'>Subscribe</button></a>
            </div>
          </div>
          <dl className="grid grid-cols-1 text-left gap-x-8 gap-y-10 sm:grid-cols-2 lg:pt-2">
            <div className="flex flex-col items-start">
              <div className="p-2 rounded-md bg-white/5 ring-1 ring-white/10">
                <CalendarDaysIcon className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <dt className="mt-4 font-semibold text-white">Weekly articles</dt>
              <dd className="mt-2 leading-7 text-gray-400">
                Rest assured, we prioritize your privacy and promise a spam-free experience.
              </dd>
            </div>
            <div className="flex flex-col items-start">
              <div className="p-2 rounded-md bg-white/5 ring-1 ring-white/10">
                <HandRaisedIcon className="w-6 h-6 text-white" aria-hidden="true" />
              </div>
              <dt className="mt-4 font-semibold text-white">No spam</dt>
              <dd className="mt-2 leading-7 text-gray-400">
                Join our community and stay informed without worrying about spam.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  )
}
