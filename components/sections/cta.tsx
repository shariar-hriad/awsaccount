import { Button } from '@/components/ui/button'

export default function CTA() {
    return (
        <section className='py-5 px-2'>
            <div className='w-full max-w-5xl flex flex-col lg:flex-row justify-between gap-10 items-center mx-auto bg-primary px-10 py-5 rounded-lg'>
                <div className='space-y-2 text-white'>
                    <h2 className='text-3xl font-bold'>
                        Ready to Start Your AWS Journey?
                    </h2>
                    <p className='text-xl'>
                        Get your pre-configured AWS account today and accelerate
                        your cloud projects.
                    </p>
                </div>
                <Button size='lg' variant='destructive'>
                    Buy Your AWS Account Now
                </Button>
            </div>
        </section>
    )
}
