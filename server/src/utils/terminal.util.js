const importArgs = () => {
  const args = process.argv.slice(2);
  args.forEach(arg => {
    const [key, value] = arg.split('=');
    process.env[key] = value;
  })
};

module.exports = {
  importArgs
};