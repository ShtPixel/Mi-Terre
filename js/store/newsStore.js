let newsData = [];

/**
 * Carga las noticias desde el JSON y purga las noticias vencidas
 */
export async function initNewsStore() {
    try {
        const response = await fetch('./data/news.json');
        if (!response.ok) throw new Error('No se pudo cargar la base de datos de noticias.');
        

        const rawNews = await response.json();
        const now = new Date();

        // REGLA DE PURGA: Filtrar solo las noticias cuya fecha sea mayor o igual a AHORA
        newsData = rawNews
            .filter(news => new Date(news.fecha) >= now)
            .sort((a, b) => new Date(b.fecha) - new Date(a.fecha)); // Orden descendente por fecha
    } catch (error) {
        console.error('Error en NewsStore:', error);
        newsData = [];
    }
}

/**
 * retorna solo las noticias recientes (útil para la página de Inicio)
    */

export function getRecentNews(limit = 3) {
    return newsData.slice(0, limit);
}

/**
 * Retorna la totalidad de noticias vigentes (para el listado completo)
 */
export function getAllNews() {
    return [...newsData];
}