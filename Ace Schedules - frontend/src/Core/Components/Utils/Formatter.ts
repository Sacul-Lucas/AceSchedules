export const formatCaracteristicas = (caracteristicas: string): string[] => {
    const caracteristicasArray = caracteristicas
        .replace(/"/g, '')
        .split(/\n/)
        .map(item => item.trim())
        .filter(item => item);

    return caracteristicasArray
};