export const formatCaracteristicas = (caracteristicas: string | undefined): string[] => {
    if (!caracteristicas) {
        return [];  // Retorna um array vazio se caracteristicas for undefined ou null
    }

    const caracteristicasArray = caracteristicas
        .replace(/"/g, '')
        .split(/\n/)
        .map(item => item.trim())
        .filter(item => item);

    return caracteristicasArray;
};

export const getInitials = (fullName: string | undefined): string => {
    if (!fullName) {
        return '';  // Retorna uma string vazia se fullName for undefined ou null
    }

    const names = fullName.trim().split(' ');

    if (names.length === 0) {
        return '';
    }

    const firstNameInitial = names[0].charAt(0).toUpperCase();
    const lastNameInitial = names.length > 1 ? names[names.length - 1].charAt(0).toUpperCase() : '';

    return lastNameInitial ? `${firstNameInitial}${lastNameInitial}` : firstNameInitial;
};

export const stringToColor = (str: string): string => {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        hash = str.charCodeAt(i) + ((hash << 5) - hash); // Gera um hash a partir do nome
    }
    const color = `hsl(${hash % 360}, 70%, 50%)`; // Transforma o hash em uma cor HSL
    return color;
};