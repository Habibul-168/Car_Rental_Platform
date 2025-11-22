const PasswordValidator = ({ password }) => {
  const requirements = [
    { text: 'At least 8 characters', test: (pwd) => pwd.length >= 8 },
    { text: 'At least 1 uppercase letter', test: (pwd) => /[A-Z]/.test(pwd) },
    { text: 'At least 1 lowercase letter', test: (pwd) => /[a-z]/.test(pwd) },
    { text: 'At least 1 number', test: (pwd) => /\d/.test(pwd) },
    { text: 'At least 1 special character', test: (pwd) => /[!@#$%^&*(),.?":{}|<>]/.test(pwd) }
  ]

  return (
    <div className="mt-2 space-y-1">
      {requirements.map((req, index) => {
        const isValid = req.test(password)
        return (
          <div key={index} className="flex items-center gap-2 text-sm">
            <span className={`text-lg ${isValid ? 'text-green-500' : 'text-gray-500'}`}>
              {isValid ? '✓' : '○'}
            </span>
            <span className={isValid ? 'text-green-400' : 'text-gray-400'}>
              {req.text}
            </span>
          </div>
        )
      })}
    </div>
  )
}

export default PasswordValidator