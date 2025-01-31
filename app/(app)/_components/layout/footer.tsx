import Link from 'next/link'

export default function Footer() {
    return (
        <footer className='py-8 dark:bg-stone-950'>
            <div className='container mx-auto px-4'>
                <div className='flex flex-wrap justify-between'>
                    <div className='w-full md:w-1/3 mb-6 md:mb-0'>
                        <h3 className='text-2xl font-bold mb-4'>
                            AWSAccountPro
                        </h3>
                        <p>Simplifying your AWS journey</p>
                    </div>
                    <div className='w-full md:w-1/3 mb-6 md:mb-0'>
                        <h4 className='text-lg font-semibold mb-4'>
                            Quick Links
                        </h4>
                        <ul>
                            <li>
                                <Link
                                    href='#features'
                                    className='hover:text-blue-400'
                                >
                                    Features
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='#pricing'
                                    className='hover:text-blue-400'
                                >
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href='#contact'
                                    className='hover:text-blue-400'
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className='w-full md:w-1/3'>
                        <h4 className='text-lg font-semibold mb-4'>
                            Contact Us
                        </h4>
                        <p>Email: support@awsaccountpro.com</p>
                        <p>Phone: (123) 456-7890</p>
                    </div>
                </div>
                <div className='mt-8 text-center'>
                    <p>&copy; 2023 AWSAccountPro. All rights reserved.</p>
                </div>
            </div>
        </footer>
    )
}
