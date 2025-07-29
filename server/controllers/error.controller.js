export const getErrorMessage = (err) => {
  return err.message || 'An error occurred';
};

export const handleError = (req, res) => {
  res.status(500).json({ error: 'Internal server error' });
};