interface ButtonProps {
    bg: string,
    txt: string,
    content: string
}

const Button = ({ bg, txt, content }: ButtonProps) => {
  return (
    <div className={`text-center justify-center items-center ${bg} ${txt} w-32 p-3 rounded-lg`}>
        {content}
    </div>
  )
}

export default Button;