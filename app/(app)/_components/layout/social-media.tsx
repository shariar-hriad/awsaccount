import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'

const SocialMedia = () => {
    return (
        <div className='flex items-center gap-2'>
            <Button variant='outline' size='icon' asChild>
                <Link
                    href='https://join.skype.com/invite/rx9Pzj45iSST'
                    target='_blank'
                >
                    <Image
                        src='/icon/skype.svg'
                        alt='skype'
                        width={20}
                        height={20}
                    />
                </Link>
            </Button>
            <Button variant='outline' size='icon' asChild>
                <Link href='https://wa.me/+447405603221' target='_blank'>
                    <Image
                        src='/icon/whatsapp.svg'
                        alt='skype'
                        width={20}
                        height={20}
                    />
                </Link>
            </Button>
            <Button variant='outline' size='icon' asChild>
                <Link href='https://t.me/awsbulkcom' target='_blank'>
                    <Image
                        src='/icon/telegram.png'
                        alt='telegram'
                        width={20}
                        height={20}
                    />
                </Link>
            </Button>
        </div>
    )
}

export default SocialMedia
