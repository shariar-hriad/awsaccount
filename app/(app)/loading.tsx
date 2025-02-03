interface SpinningCircleLoaderProps {
    size?: number
    color?: string
    borderWidth?: number
    className?: string
    message?: string
}

export default function SpinningCircleLoader({
    size = 40,
    color = 'currentColor',
    borderWidth = 4,
    className = '',
    message,
}: SpinningCircleLoaderProps) {
    return (
        <div className='w-full h-[50vh] flex items-center justify-center bg-background'>
            <div className={`flex flex-col items-center ${className}`}>
                <div
                    className='inline-block'
                    style={{
                        width: size,
                        height: size,
                    }}
                    role='status'
                    aria-label='Loading'
                >
                    <svg
                        className='animate-spin'
                        viewBox={`0 0 ${size} ${size}`}
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <circle
                            className='opacity-25'
                            cx={size / 2}
                            cy={size / 2}
                            r={(size - borderWidth) / 2}
                            stroke={color}
                            strokeWidth={borderWidth}
                        />
                        <path
                            className='opacity-75'
                            fill={color}
                            d={`
              M ${size / 2} ${borderWidth / 2}
              A ${(size - borderWidth) / 2} ${(size - borderWidth) / 2} 0 0 1 ${
                                size - borderWidth / 2
                            } ${size / 2}
            `}
                        />
                    </svg>
                </div>
                {message && (
                    <p className='mt-2 text-sm font-medium text-gray-500'>
                        {message}
                    </p>
                )}
            </div>
        </div>
    )
}
