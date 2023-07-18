import theme from "../../theme";
export const UploadStyles = {
  '.upload-container': {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '20px',
  },
  '.upload-area': {
    width: '300px',
    height: '100px',
    border: '2px dashed #ccc',
    display: 'flex',
    flexDirection: 'column',
    fontSize: '15px',
    fontFamily: 'Poppins',
    fontWeight: 'bold',
    alignItems: 'center',
  },
  '.files-list': {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    gap: '5px',
    maxHeight: '150px',
    overflowY: 'auto',
    '&::-webkit-scrollbar': {
      width: '9px',
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: theme.palette.secondary.main,
      borderRadius: '5px',
      border: 'none',
    },
  },
  '.file-item': {
    display: 'flex',
    alignItems: 'center',
    padding: '5px',
    width: '90%',
  },
  '.file-info': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  '.delete-icon': {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '15px',
    height: '15px',
    color: theme.palette.secondary.main,
    cursor: 'pointer',
  },
  '.BackupIcon': {
    paddingTop: '3px',
    cursor: 'pointer',
    color: theme.palette.secondary.main,
  },
  '.title': {
    color: theme.palette.secondary.main,
    display: 'inline-block',
    textAlign: 'center'
  }
};












