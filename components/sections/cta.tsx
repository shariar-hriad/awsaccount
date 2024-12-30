import { Button } from '@/components/ui/button'

export default function CTA() {
    return (
        <section className='py-20 bg-blue-600 text-white'>
            <div className='container mx-auto px-4 text-center'>
                <h2 className='text-3xl font-bold mb-4'>
                    Ready to Start Your AWS Journey?
                </h2>
                <p className='text-xl mb-8'>
                    Get your pre-configured AWS account today and accelerate
                    your cloud projects.
                </p>
                <Button size='lg' variant='destructive'>
                    Buy Your AWS Account Now
                </Button>
            </div>
        </section>
    )
}
