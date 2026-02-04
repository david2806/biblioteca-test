import { motion } from 'framer-motion';
import { BookOpen, TrendingUp, Award, Target } from 'lucide-react';
import { useLibrary } from '../hooks/useLibrary';
import { calculateReadingStats, checkAchievements } from '../utils/helpers';
import Card from '../components/ui/Card';

const Statistics = () => {
  const { wantToRead, reading, read } = useLibrary();
  const stats = calculateReadingStats(read);
  const achievements = checkAchievements(stats, read, reading, wantToRead);

  const statCards = [
    {
      title: 'Books Read',
      value: stats.totalBooks,
      icon: BookOpen,
      color: 'text-blue-500',
      bgColor: 'bg-blue-100 dark:bg-blue-900/20',
    },
    {
      title: 'Currently Reading',
      value: reading.length,
      icon: TrendingUp,
      color: 'text-green-500',
      bgColor: 'bg-green-100 dark:bg-green-900/20',
    },
    {
      title: 'Want to Read',
      value: wantToRead.length,
      icon: Target,
      color: 'text-purple-500',
      bgColor: 'bg-purple-100 dark:bg-purple-900/20',
    },
    {
      title: 'Total Pages Read',
      value: stats.totalPages.toLocaleString(),
      icon: BookOpen,
      color: 'text-orange-500',
      bgColor: 'bg-orange-100 dark:bg-orange-900/20',
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h1 className="text-4xl font-serif font-bold mb-8">Reading Statistics</h1>

        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {statCards.map((stat, index) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold">{stat.value}</p>
                    </div>
                    <div className={`p-4 rounded-full ${stat.bgColor}`}>
                      <Icon className={stat.color} size={32} />
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Genre Distribution */}
        {Object.keys(stats.genreDistribution).length > 0 && (
          <div className="mb-12">
            <h2 className="text-2xl font-serif font-bold mb-6">Genre Distribution</h2>
            <Card>
              <div className="space-y-4">
                {Object.entries(stats.genreDistribution)
                  .sort(([, a], [, b]) => b - a)
                  .slice(0, 10)
                  .map(([genre, count]) => {
                    const percentage = (count / stats.totalBooks) * 100;
                    return (
                      <div key={genre}>
                        <div className="flex justify-between mb-2">
                          <span className="font-medium">{genre}</span>
                          <span className="text-gray-600 dark:text-gray-400">
                            {count} books ({percentage.toFixed(0)}%)
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                          <motion.div
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="bg-accent-500 h-2 rounded-full"
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </Card>
          </div>
        )}

        {/* Achievements */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <Award className="text-accent-500" size={32} />
            <h2 className="text-2xl font-serif font-bold">Achievements</h2>
          </div>
          
          {achievements.length === 0 ? (
            <Card className="text-center">
              <div className="py-8">
                <Award className="mx-auto text-gray-400 mb-4" size={64} />
                <h3 className="text-xl font-serif font-bold mb-2">No Achievements Yet</h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Start reading books to unlock achievements!
                </p>
              </div>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {achievements.map((achievement, index) => (
                <motion.div
                  key={achievement.id}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="text-center">
                    <div className="mb-4">
                      <Award className="mx-auto text-yellow-500" size={48} />
                    </div>
                    <h3 className="font-serif font-bold text-lg mb-2">
                      {achievement.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {achievement.description}
                    </p>
                    {achievement.unlocked && (
                      <div className="mt-4 inline-block px-3 py-1 bg-green-100 dark:bg-green-900/20 text-green-700 dark:text-green-400 rounded-full text-sm font-medium">
                        Unlocked! 🎉
                      </div>
                    )}
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Reading Goal */}
        <div className="mt-12">
          <h2 className="text-2xl font-serif font-bold mb-6">Reading Goal</h2>
          <Card>
            <div className="text-center py-8">
              <Target className="mx-auto text-accent-500 mb-4" size={64} />
              <h3 className="text-xl font-bold mb-2">Annual Reading Goal</h3>
              <p className="text-4xl font-bold text-accent-500 mb-2">
                {stats.totalBooks} / 50
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {stats.totalBooks >= 50 
                  ? 'Congratulations! Goal achieved! 🎉'
                  : `${50 - stats.totalBooks} books to go!`
                }
              </p>
              <div className="max-w-md mx-auto">
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min((stats.totalBooks / 50) * 100, 100)}%` }}
                    transition={{ duration: 1, delay: 0.3 }}
                    className="bg-accent-500 h-4 rounded-full"
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      </motion.div>
    </div>
  );
};

export default Statistics;
