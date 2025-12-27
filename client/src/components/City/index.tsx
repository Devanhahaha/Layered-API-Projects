type childrenProps = {
  children: React.ReactNode;
  className?: string;
}

export default function Main ({children, className} : childrenProps) {
    return (
        <div className={className}>
            {children}
        </div>
  )
}