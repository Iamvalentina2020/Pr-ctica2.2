/**
 * Neomorphic Theme
 * Tema neuromórfico con paleta rosado-violeta-rojo
 */

export const NeomorphicColors = {
  // Colores principales - Paleta rosado-violeta-rojo
  primary: {
    light: '#FF6B9D',      // Rosa suave
    main: '#E91E63',       // Rosa intenso
    dark: '#C2185B',       // Rosa oscuro
    gradient: ['#FF6B9D', '#C2185B'],
  },
  secondary: {
    light: '#BA68C8',      // Violeta claro
    main: '#9C27B0',       // Violeta
    dark: '#7B1FA2',       // Violeta oscuro
    gradient: ['#BA68C8', '#7B1FA2'],
  },
  accent: {
    light: '#FF5252',      // Rojo claro
    main: '#F44336',       // Rojo
    dark: '#D32F2F',       // Rojo oscuro
    gradient: ['#FF5252', '#D32F2F'],
  },
  
  // Colores neuromórficos
  neomorphic: {
    background: '#F0E6F6',           // Fondo lila muy claro
    cardBackground: '#F5EEF8',       // Fondo de tarjetas
    shadowLight: '#FFFFFF',          // Sombra clara
    shadowDark: '#D1C4DC',          // Sombra oscura
    pressed: '#E8DDED',              // Estado presionado
  },
  
  // Gradientes especiales
  gradients: {
    primary: ['#FF6B9D', '#E91E63', '#C2185B'],
    secondary: ['#BA68C8', '#9C27B0', '#7B1FA2'],
    accent: ['#FF5252', '#F44336', '#D32F2F'],
    mixed: ['#FF6B9D', '#BA68C8', '#F44336'],
    soft: ['#FFB3D9', '#E1BEE7', '#FFCDD2'],
  },
  
  // Colores de texto
  text: {
    primary: '#4A148C',     // Violeta muy oscuro
    secondary: '#6A1B9A',   // Violeta oscuro
    disabled: '#9575CD',    // Violeta claro
    hint: '#BA68C8',        // Violeta medio
  },
  
  // Estados
  status: {
    success: '#BA68C8',
    error: '#F44336',
    warning: '#FF6B9D',
    info: '#9C27B0',
  },
  
  // Bordes y divisores
  border: {
    light: '#E1BEE7',
    main: '#CE93D8',
    dark: '#BA68C8',
  },
};

/**
 * Configuración de sombras neuromórficas
 */
export const NeomorphicShadows = {
  small: {
    shadowColor: NeomorphicColors.neomorphic.shadowDark,
    shadowOffset: { width: 4, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 4,
  },
  medium: {
    shadowColor: NeomorphicColors.neomorphic.shadowDark,
    shadowOffset: { width: 6, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 6,
  },
  large: {
    shadowColor: NeomorphicColors.neomorphic.shadowDark,
    shadowOffset: { width: 10, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 10,
  },
  inner: {
    shadowColor: NeomorphicColors.neomorphic.shadowDark,
    shadowOffset: { width: -4, height: -4 },
    shadowOpacity: 0.5,
    shadowRadius: 6,
    elevation: 2,
  },
};

/**
 * Configuración de luces neuromórficas
 */
export const NeomorphicLights = {
  small: {
    shadowColor: NeomorphicColors.neomorphic.shadowLight,
    shadowOffset: { width: -4, height: -4 },
    shadowOpacity: 1,
    shadowRadius: 6,
    elevation: 4,
  },
  medium: {
    shadowColor: NeomorphicColors.neomorphic.shadowLight,
    shadowOffset: { width: -6, height: -6 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 6,
  },
  large: {
    shadowColor: NeomorphicColors.neomorphic.shadowLight,
    shadowOffset: { width: -10, height: -10 },
    shadowOpacity: 1,
    shadowRadius: 15,
    elevation: 10,
  },
};

/**
 * Estilos de botones neuromórficos
 */
export const NeomorphicButtonStyles = {
  base: {
    backgroundColor: NeomorphicColors.neomorphic.cardBackground,
    borderRadius: 15,
    paddingVertical: 12,
    paddingHorizontal: 24,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  },
  pressed: {
    backgroundColor: NeomorphicColors.neomorphic.pressed,
  },
};

/**
 * Estilos de inputs neuromórficos
 */
export const NeomorphicInputStyles = {
  base: {
    backgroundColor: NeomorphicColors.neomorphic.cardBackground,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontSize: 16,
    color: NeomorphicColors.text.primary,
  },
};

/**
 * Estilos de tarjetas neuromórficas
 */
export const NeomorphicCardStyles = {
  base: {
    backgroundColor: NeomorphicColors.neomorphic.cardBackground,
    borderRadius: 20,
    padding: 20,
  },
};

/**
 * Espaciado consistente
 */
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

/**
 * Tipografía
 */
export const Typography = {
  h1: {
    fontSize: 32,
    fontWeight: 'bold' as const,
    color: NeomorphicColors.text.primary,
  },
  h2: {
    fontSize: 28,
    fontWeight: 'bold' as const,
    color: NeomorphicColors.text.primary,
  },
  h3: {
    fontSize: 24,
    fontWeight: '600' as const,
    color: NeomorphicColors.text.primary,
  },
  h4: {
    fontSize: 20,
    fontWeight: '600' as const,
    color: NeomorphicColors.text.primary,
  },
  body1: {
    fontSize: 16,
    fontWeight: 'normal' as const,
    color: NeomorphicColors.text.secondary,
  },
  body2: {
    fontSize: 14,
    fontWeight: 'normal' as const,
    color: NeomorphicColors.text.secondary,
  },
  caption: {
    fontSize: 12,
    fontWeight: 'normal' as const,
    color: NeomorphicColors.text.hint,
  },
};
