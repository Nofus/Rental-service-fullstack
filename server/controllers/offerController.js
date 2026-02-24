import { Offer } from "../models/offer.js";
import { User } from '../models/user.js';
import ApiError from '../error/ApiError.js';
import { adaptOfferToClient, adaptFullOfferToClient } from '../adapters/offerAdapter.js';

async function getAllOffers(req, res, next) {
    try {
        const offers = await Offer.findAll();
        const adaptedOffers = offers.map(adaptOfferToClient);
        res.status(200).json(adaptedOffers);
    } catch (error) {
        next(ApiError.internal('Не удалось получить список предложений'));
    }
}

async function getFullOffer(req, res, next) {
    try {
        const { id } = req.params;

        const offer = await Offer.findByPk(id, {
            include: { model: User, as: 'author' }
        });

        if (!offer) {
            return next(ApiError.badRequest('Offer not found'));
        }

        const adaptedOffer = adaptFullOfferToClient(offer, offer.author);
        res.status(200).json(adaptedOffer);
    } catch (error) {
        next(ApiError.internal('Не удалось получить предложение'));
    }
}

async function createOffer(req, res, next) {
    try {
        const {
            title, description, publishDate, city,
            isPremium, isFavorite, rating, type, rooms, guests, price,
            features, commentsCount, latitude, longitude, userId
        } = req.body;

        if (!title || !description || !city || !type) {
            return next(ApiError.badRequest('Отсутствуют обязательные поля'));
        }

        if (!req.files?.previewImage || req.files.previewImage.length === 0) {
            return next(ApiError.badRequest('Превью изображение обязательно для загрузки'));
        }

        const previewImagePath = `/static/${req.files.previewImage[0].filename}`;

        let processedPhotos = [];
        if (req.files?.photos) {
            processedPhotos = req.files.photos.map(file => `/static/${file.filename}`);
        }


        let parsedFeatures = [];
        if (features) {
            try {
                parsedFeatures = typeof features === 'string' ? JSON.parse(features) : features;
            } catch {
                parsedFeatures = features.split(',').map(f => f.trim());
            }
        }

        const parseSafeInt = (value, defaultValue = 0) => {
            if (value === undefined || value === null || value === '') return defaultValue;
            const parsed = parseInt(value);
            return isNaN(parsed) ? defaultValue : parsed;
        };

        const parseSafeFloat = (value, defaultValue = 0) => {
            if (value === undefined || value === null || value === '') return defaultValue;
            const parsed = parseFloat(value);
            return isNaN(parsed) ? defaultValue : parsed;
        };

        const parseSafeBoolean = (value) => {
            if (value === undefined || value === null) return false;
            if (typeof value === 'boolean') return value;
            if (typeof value === 'string') {
                return value.toLowerCase() === 'true' || value === '1';
            }
            return Boolean(value);
        };

        const offer = await Offer.create({
            title,
            description,
            publishDate: publishDate || new Date(),
            city,
            previewImage: previewImagePath,
            photos: processedPhotos,
            isPremium: parseSafeBoolean(isPremium),
            isFavorite: parseSafeBoolean(isFavorite),
            rating: parseSafeFloat(rating, 0),
            type,
            rooms: parseSafeInt(rooms, 1),
            guests: parseSafeInt(guests, 1),
            price: parseSafeInt(price, 0),
            features: parsedFeatures,
            commentsCount: parseSafeInt(commentsCount, 0),
            latitude: parseSafeFloat(latitude, 0),
            longitude: parseSafeFloat(longitude, 0),
            authorId: parseSafeInt(userId, null)
        });

        return res.status(201).json(offer);
    } catch (error) {
        console.error('Детали ошибки:', error);
        next(ApiError.internal('Не удалось добавить предложение: ' + error.message));
    }
}

async function getFavoriteOffers(req, res, next) {
    try {
        const offers = await Offer.findAll({
            where: { isFavorite: true }
        });
        const adaptedOffers = offers.map(adaptOfferToClient);
        res.status(200).json(adaptedOffers);
    } catch (error) {
        next(ApiError.internal('Не удалось получить избранные предложения'));
    }
}


async function toggleFavorite(req, res, next) {
    try {
        const { offerId, status } = req.params;
        
        const offer = await Offer.findByPk(offerId);
        if (!offer) {
            return next(ApiError.notFound('Предложение не найдено'));
        }
        
        offer.isFavorite = status === '1';
        await offer.save();
        
        res.json(adaptOfferToClient(offer));
    } catch (error) {
        next(ApiError.internal('Ошибка при обновлении статуса избранного'));
    }
}

export { getAllOffers, getFullOffer, createOffer, getFavoriteOffers, toggleFavorite };

