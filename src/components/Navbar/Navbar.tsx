import { useTranslation } from 'react-i18next';
import { Button, AppBar, NativeSelect, FormControl, SelectChangeEvent } from '@mui/material';
import { StyledButton, StyledButtonGroup } from './Navbar.styles';
import { Link } from 'react-router-dom';
interface Langs {
  [key: string]: { nativeName: string };
}

export const Navbar = () => {
  const { t, i18n } = useTranslation();
  const langs: Langs = {
    en: { nativeName: 'English' },
    pl: { nativeName: 'Polski' },
  };

  const handleLanguageChange = (event: SelectChangeEvent) => {
    i18n.changeLanguage(event.target.value);
  };

  return (
    <AppBar position="static">
      <StyledButtonGroup>
        <StyledButton>
          <Link style={{ textDecoration: 'none' }} to="/invoices">
            <Button variant="contained">{t('invoices')}</Button>
          </Link>
        </StyledButton>
        <StyledButton>
          <Link style={{ textDecoration: 'none' }} to="/create">
            <Button variant="contained">{t('addInvoice')}</Button>
          </Link>
        </StyledButton>

        <FormControl>
          <NativeSelect
            inputProps={{
              name: 'language',
            }}
            onChange={(e: any) => {
              handleLanguageChange(e);
            }}
            value={i18n.resolvedLanguage}
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
