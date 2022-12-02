import { Button, AppBar, NativeSelect, FormControl, SelectChangeEvent } from '@mui/material';
import { StyledButton, StyledButtonGroup } from './Navbar.styles';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

export const Navbar = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const langs: any = {
    en: { nativeName: 'English' },
    pl: { nativeName: 'Polski' },
  };
  const handleCreateInvoice = () => {
    navigate('/create');
  };

  const handleLanguageChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <AppBar position="static">
      <StyledButtonGroup>
        <StyledButton>
          <Button variant="contained" onClick={() => navigate('/invoices')}>
            {t('invoices')}
          </Button>
        </StyledButton>
        <StyledButton>
          <Button variant="contained" onClick={handleCreateInvoice}>
            {t('addInvoice')}
          </Button>
        </StyledButton>

        <FormControl>
          <NativeSelect
            inputProps={{
              name: 'language',
            }}
            onChange={(e: any) => {
              handleLanguageChange(e);
            }}
          >
            {Object.keys(langs).map((lng) => (
              <option key={lng} value={lng} disabled={i18n.resolvedLanguage === lng}>
                {langs[lng].nativeName}
              </option>
            ))}
          </NativeSelect>
        </FormControl>
      </StyledButtonGroup>
    </AppBar>
  );
};
