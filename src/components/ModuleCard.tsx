import React from 'react';
import type { Module } from '../data/modulesData';

interface ModuleCardProps {
  module: Module;
  completed: boolean;
  inProgress: boolean;
  onClick: () => void;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({ module, completed, inProgress, onClick }) => {
  const getDifficultyColor = () => {
    switch (module.difficulty) {
      case 'inicial': return 'var(--color-accent)';
      case 'intermedio': return 'var(--color-alert)';
      case 'desafio': return 'var(--color-danger)';
      default: return 'var(--text-muted)';
    }
  };

  return (
    <button
      onClick={onClick}
      className="card"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'space-between',
        textAlign: 'left',
        width: '100%',
        cursor: 'pointer',
        border: '1px solid var(--border-color)',
        minHeight: '220px',
        backgroundColor: 'var(--bg-card)'
      }}
      aria-label={`Módulo ${module.id}: ${module.title}. Dificultad: ${module.difficulty}. Estado: ${completed ? 'Completado' : inProgress ? 'En progreso' : 'No iniciado'}`}
    >
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.75rem', fontWeight: 'bold', color: getDifficultyColor(), textTransform: 'uppercase' }}>
            {module.difficulty}
          </span>
          <span style={{ fontSize: '0.8rem' }}>
            {completed ? '✅ Completado' : inProgress ? '🟡 En curso' : '💤 Sin iniciar'}
          </span>
        </div>

        <h3 style={{ fontSize: '1.25rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>
          {module.id}. {module.title}
        </h3>
        
        <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.4', margin: 0 }}>
          {module.description}
        </p>
      </div>

      <div style={{ borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem', marginTop: '1rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--color-accent)', fontWeight: '600' }}>
          Comenzar módulo ➡️
        </span>
      </div>
    </button>
  );
};
